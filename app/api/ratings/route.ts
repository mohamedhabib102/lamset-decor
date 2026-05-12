import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase.from("rating").select();

        if (error) {
            return NextResponse.json({ 
                error: "حدث خطأ ما في قاعدة البيانات", 
                message: "فشل جلب التقييمات" 
            }, { status: 500 });
        };

        return NextResponse.json({ 
            data, 
            message: "تم جلب التقييمات بنجاح" 
        }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({ 
            error:  "حدث خطأ ما", 
            message: "فشل جلب التقييمات" 
        }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    try {
        const {fullName, message} = await req.json();

        if (!fullName || !message) {
            return NextResponse.json({ 
                error: "البيانات غير صحيحة", 
                message: "يرجى إدخال جميع البيانات المطلوبة" 
            }, { status: 400 });
        }

        const {data, error} = await supabase.from("rating").insert({
            fullName,
            message
        });

        return NextResponse.json({ 
            message: "تم إضافة التقييم بنجاح" 
        }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({ 
            error:  "حدث خطأ ما", 
            message: "فشل إضافة التقييم" 
        }, { status: 500 });
    }
}
