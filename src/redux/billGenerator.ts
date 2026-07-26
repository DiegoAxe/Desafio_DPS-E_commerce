//Para crear los pdfs que seran las facturas
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Product } from "../types/Product";
import { Usuario } from "../types/Usuario";

export const billGenerator = (
    cart: Product[],
    total: number,
    buyer: Usuario
) => {

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Factura de Ecommerce", 14, 20);

    doc.setFontSize(12);

    doc.text([
        `Fecha: ${new Date().toLocaleDateString()}`,
        `A nombre de: ${buyer.name},`,
        `de correo electronico: ${buyer.email}`,
        ],
        14,
        30
    );
    doc.text(
        ``,
        14,
        30
    );

    const rows = cart.map(item => [
        item.title,
        item.quantity.toString(),
        `$${item.price.toFixed(2)}`,
        `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
        head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
        body: rows,
        startY: 50
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(14);

    doc.text(
        `TOTAL: $${total.toFixed(2)}`,
        14,
        finalY
    );

    doc.save(`Factura ${buyer.name}.pdf`);
};