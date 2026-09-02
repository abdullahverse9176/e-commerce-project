import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CategoryProvider } from './context/CategoryContext';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage';
import { ProductsListPage } from './pages/dashboard/ProductsListPage';
import { CreateProductPage } from './pages/dashboard/CreateProductPage';
import { CategoriesListPage } from './pages/dashboard/CategoriesListPage';
import { CreateCategoryPage } from './pages/dashboard/CreateCategoryPage';
import { EditCategoryPage } from './pages/dashboard/EditCategoryPage';

export function App() {
  return (
    <CategoryProvider>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            {/* Main Storefront Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>

            {/* Dashboard Sub-routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverviewPage />} />
              <Route path="products" element={<ProductsListPage />} />
              <Route path="create-product" element={<CreateProductPage />} />
              <Route path="categories" element={<CategoriesListPage />} />
              <Route path="create-category" element={<CreateCategoryPage />} />
              <Route path="edit-category/:id" element={<EditCategoryPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </CategoryProvider>
  );
}

export default App;
