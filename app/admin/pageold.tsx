'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Search,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from 'lucide-react'
import { toast } from 'sonner'

interface AdminProduct {
  id: string
  name: string
  price: number
  stock: number
  category: 'EQUIPMENT' | 'CONSUMABLES' | 'PHARMACEUTICALS'
}

const INITIAL_PRODUCTS: AdminProduct[] = [
  { id: '1', name: 'Digital Blood Pressure Monitor', price: 89.99, stock: 12, category: 'EQUIPMENT' },
  { id: '2', name: 'Sterile Surgical Gloves (100 pairs)', price: 24.99, stock: 45, category: 'CONSUMABLES' },
  { id: '3', name: 'Amoxicillin 500mg Capsules', price: 15.99, stock: 8, category: 'PHARMACEUTICALS' },
  { id: '4', name: 'Oxygen Pulse Oximeter', price: 49.99, stock: 20, category: 'EQUIPMENT' },
]

export default function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<{
    name: string
    price: number
    stock: number
    category: 'EQUIPMENT' | 'CONSUMABLES' | 'PHARMACEUTICALS'
  }>({
    name: '',
    price: 0,
    stock: 0,
    category: 'EQUIPMENT',
  })

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    const product: AdminProduct = {
      id: Math.random().toString(),
      ...newProduct,
    }

    setProducts([...products, product])
    setNewProduct({ name: '', price: 0, stock: 0, category: 'EQUIPMENT' })
    toast.success('Product added successfully')
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
    toast.success('Product deleted')
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-100 dark:bg-blue-900' },
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'bg-green-100 dark:bg-green-900' },
    { label: 'Total Orders', value: '248', icon: ShoppingCart, color: 'bg-purple-100 dark:bg-purple-900' },
    { label: 'Active Users', value: '1,203', icon: Users, color: 'bg-cyan-100 dark:bg-cyan-900' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              C
            </div>
            <span className="font-bold text-xl text-foreground">Cadical Admin</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Store
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>+12% from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-3xl font-bold text-foreground">Products</h2>
            <Button className="gap-2 w-full md:w-auto">
              <Plus className="h-4 w-4" />
              Add New Product
            </Button>
          </div>

          {/* Add Product Form */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="font-bold text-lg text-foreground">Quick Add Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                }
              />
              <Input
                type="number"
                placeholder="Stock"
                value={newProduct.stock || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })
                }
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value as 'EQUIPMENT' | 'CONSUMABLES' | 'PHARMACEUTICALS',
                  })
                }
                className="px-3 py-2 border border-border rounded-lg"
              >
                <option value="EQUIPMENT">Equipment</option>
                <option value="CONSUMABLES">Consumables</option>
                <option value="PHARMACEUTICALS">Pharmaceuticals</option>
              </select>
              <Button onClick={handleAddProduct} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Products Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors animate-in fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{product.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-primary">
                          ${product.price.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${
                            product.stock > 10
                              ? 'text-green-600'
                              : product.stock > 0
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(product.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
