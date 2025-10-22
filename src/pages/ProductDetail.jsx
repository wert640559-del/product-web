import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartOperations } from "../hooks/useCart";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});

  const { addToCart, isInCart, getItemQuantity } = useCartOperations();

  useEffect(() => {
    console.log("🔍 productId dari URL:", productId);

    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((res) => {
        console.log("📡 Status response:", res.status);
        if (!res.ok) throw new Error(`Gagal memuat produk: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Data produk:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  // 🚧 Saat data masih dimuat
  if (loading) return <div className="loading">Memuat detail produk...</div>;

  // ❌ Jika produk gagal dimuat
  if (!product) return <div className="error-message">Produk tidak ditemukan</div>;

  // ✅ Aman karena sekarang product sudah pasti ada
  const quantity = getItemQuantity(product.id);

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-header">
          <div className="product-images-vertical">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={
                  imageError[index]
                    ? "https://via.placeholder.com/300x300?text=No+Image"
                    : image
                }
                alt={`${product.title} ${index + 1}`}
                className="product-detail-image"
                onError={() => handleImageError(index)}
              />
            ))}
          </div>

          <div className="product-detail-info">
            <h2 className="product-detail-title">{product.title}</h2>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-category">
              <strong>Kategori:</strong> {product.category?.name || "Uncategorized"}
            </p>
            <p className="product-detail-description">
              <strong>Deskripsi: </strong>
              {product.description}
            </p>

            {/* Tombol Tambah ke Keranjang */}
            <div className="product-detail-actions">
              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn detail-page ${
                  isInCart(product.id) ? "in-cart" : ""
                }`}
              >
                {isInCart(product.id)
                  ? `✅ Dalam Keranjang (${quantity})`
                  : "🛒 Tambah ke Keranjang"}
              </button>
            </div>

            <br />

            <Link to="/products" className="back-link">
              ← Kembali ke Daftar Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
