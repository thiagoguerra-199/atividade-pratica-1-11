import { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { getProducts, getProductById } from './services/productsApi';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      try {
        const data = await getProducts({ signal: controller.signal });
        if (!Array.isArray(data)) throw new Error('A API não retornou uma lista de produtos.');
        if (!controller.signal.aborted) setProducts(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(`Não foi possível carregar os produtos. ${err.message}`);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedId === null) return;
    const controller = new AbortController();
    async function loadDetails() {
      try {
        const data = await getProductById(selectedId, { signal: controller.signal });
        if (!controller.signal.aborted) setSelectedProduct(data);
      } catch (err) {
        if (!controller.signal.aborted) setDetailsError(`Não foi possível carregar os detalhes. ${err.message}`);
      } finally {
        if (!controller.signal.aborted) setDetailsLoading(false);
      }
    }
    loadDetails();
    return () => controller.abort();
  }, [selectedId]);

  function viewDetails(id) {
    if (id === selectedId) return;
    setSelectedProduct(null);
    setDetailsError('');
    setDetailsLoading(true);
    setSelectedId(id);
  }

  function closeDetails() {
    setSelectedId(null);
    setSelectedProduct(null);
    setDetailsError('');
    setDetailsLoading(false);
  }

  const filteredProducts = products.filter((product) =>
    product.descricao.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))
  );

  return (
    <main className="container">
      <Header />
      <ProductSearch value={search} onSearchChange={setSearch} />
      {loading && <p role="status">Carregando produtos...</p>}
      {error && <p role="alert" className="error">{error}</p>}
      {!loading && !error && <>
        <p aria-live="polite">{filteredProducts.length} produto(s) encontrado(s).</p>
        <ProductList products={filteredProducts} onViewDetails={viewDetails} />
      </>}
      {selectedId !== null && <ProductDetails product={selectedProduct} loading={detailsLoading}
        error={detailsError} onClose={closeDetails} />}
    </main>
  );
}
