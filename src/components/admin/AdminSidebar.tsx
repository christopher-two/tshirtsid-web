"use client";

import Link from "next/link";
import {
  Home,
  LogOut,
  Package,
  Package2,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/firebase";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/add-product", icon: Package, label: "Añadir Producto" },
]

export function AdminSidebar() {
    const pathname = usePathname();
    const auth = useAuth();
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                )}
                >
                <item.icon className="h-4 w-4" />
                {item.label}
                </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Cerrar Sesión</CardTitle>
              <CardDescription>
                ¿Has terminado de gestionar tu tienda? Cierra sesión aquí.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full" onClick={() => auth.signOut()}>
                <LogOut className="mr-2 h-4 w-4"/>
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
