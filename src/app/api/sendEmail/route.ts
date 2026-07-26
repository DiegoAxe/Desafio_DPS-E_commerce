import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Swal from "sweetalert2";


export async function POST(req: Request) {

    try {
        const body = await req.json();
        const {
            pdf,
            email,
            nameUser
        } = body;
        const pdfBuffer = Buffer.from(pdf);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "diegoarielmar@gmail.com",
                pass: "pdio dzsk cufc jfog",
            }
        });

        await transporter.sendMail({
            from: "diegoarielmar@gmail.com",
            to: email,
            subject: `Factura de compra, cliente ${nameUser}`,
            html: `
                <h2>Gracias por su compra a Ecommerce</h2>
                <p>Adjuntamos la factura correspondiente.</p>
            `,
            attachments: [
                {
                    filename: `Factura de cliente ${nameUser}.pdf`,
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            ]
            
        });

        return NextResponse.json({
            success: true
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Error al enviar el correo"
            },
            {
                status: 500
            }
        );

    }

}