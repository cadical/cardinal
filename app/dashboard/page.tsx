
"use client";

import { useEffect, useState } from "react";
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
  const [orders, setOrders] = useState<Order[]>([]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
  });

  

  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);



  function openCreate() {

    setOpen(true);
  }

 




 
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold"> Dashboard</h1>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          {/* <TabsTrigger value="admin">Admin Products</TabsTrigger> */}
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

       
      </Tabs>

      
      </div>
    );
    }

      

     
