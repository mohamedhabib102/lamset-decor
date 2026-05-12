import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const IDS = Number(id);

    if (!id) {
      return NextResponse.json(
        {
          error: "البيانات غير صحيحة",
          message: "يرجى إدخال id صحيح",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("rating")
      .delete()
      .eq("id", IDS);

    if (error) {
      return NextResponse.json(
        {
          error: "Database Error",
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "تم حذف التقييم بنجاح",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "حدث خطأ ما",
        message: "فشل حذف التقييم",
      },
      { status: 500 }
    );
  }
}