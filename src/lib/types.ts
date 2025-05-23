
export interface User {
    id: string;
    name?: string;
    email: string;
    role?: string;
    token?: string;
    image?: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    sku: string;
    description?: string;
    price: number;
    currentStock: number;
    minStock: number;
    category?: string;
    unit?: string;
    location?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Supplier {
    id: string;
    name: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    cnpj?: string;
    notes?: string;
  }
  
  export interface StockEntry {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    supplierId?: string;
    supplierName?: string;
    invoiceNumber?: string;
    notes?: string;
    date: Date;
    createdBy: string;
  }
  
  export interface StockOut {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    reason: 'sale' | 'loss' | 'return' | 'transfer' | 'other';
    notes?: string;
    date: Date;
    createdBy: string;
  }
  
  export interface Activity {
    id: string;
    type: 'entry' | 'out' | 'update' | 'create' | 'delete' | 'login';
    description: string;
    entityId?: string;
    entityType?: 'product' | 'supplier' | 'user';
    entityName?: string;
    timestamp: Date;
    userId: string;
    userName: string;
  }
  export interface DashboardStats {
    totalProducts: number;
    totalSuppliers: number;
    lowStockCount: number;
    totalValue: number;
    monthlyEntries: number;
    monthlyOuts: number;
  }