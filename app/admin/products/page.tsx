
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ===============================
// TYPES
// ===============================

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
};

type Order = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

// ===============================
// DASHBOARD
// ===============================

export default function EcommerceDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
  });

  // ===============================
  // FETCH DATA
  // ===============================

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  // ===============================
  // PRODUCT CRUD
  // ===============================

  function openCreate() {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "", sku: "" });
    setOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      stock: String(product.stock),
      sku: product.sku,
    });
    setOpen(true);
  }

  async function saveProduct() {
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setOpen(false);
    loadProducts();
  }

  async function deleteProduct(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  // ===============================
  // UI
  // ===============================

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ecommerce Dashboard</h1>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="admin">Admin Products</TabsTrigger>
        </TabsList>

        {/* ORDERS */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.createdAt}</TableCell>
                      <TableCell>{o.status}</TableCell>
                      <TableCell>${o.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROFILE */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Full name" />
              <Input placeholder="Email" />
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ADDRESS */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Shipping address" />
              <Button>Save Address</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ADMIN PRODUCTS */}
        <TabsContent value="admin">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Products</CardTitle>
              <Button onClick={openCreate}>Add Product</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.sku}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" onClick={() => openEdit(p)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => deleteProduct(p.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PRODUCT MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Create Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Input
              placeholder="SKU"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <Button className="w-full" onClick={saveProduct}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    );
    }

      

     
