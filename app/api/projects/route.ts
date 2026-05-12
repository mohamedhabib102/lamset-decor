import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// get all images and titles
export async function GET() {
    try {
       const { data, error } = await supabase.from("projects").select("*");

       const result =  data?.map((item) => (
        {
            ...item,
            url: supabase.storage.from("Imges").getPublicUrl(item.name).data.publicUrl
        }
       ))

        if (error) {
            return NextResponse.json({
                error: "Database Error",
                message: error.message,
            }, { status: 500 });
        }

        return NextResponse.json({
            result,
            message: "تم جلب البيانات بنجاح",
        }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({
            error: "حدث خطأ ما",
            message: "فشل جلب البيانات",
        }, { status: 500 });
    }
}

