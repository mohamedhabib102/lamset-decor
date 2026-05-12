import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const IDS = Number(id);

    // لو id مش رقم صحيح
    if (isNaN(IDS)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    // 1. هات اسم الصورة
    const { data: item, error: fetchError } = await supabaseAdmin
      .from("projects")
      .select("name")
      .eq("id", IDS)
      .single();

    if (fetchError || !item) {
      return NextResponse.json(
        { error: fetchError?.message || "Not found" },
        { status: 404 }
      );
    }

    // 2. حذف من storage
    const { error: storageError } = await supabaseAdmin.storage
      .from("Imges")
      .remove([item.name]);

    if (storageError) {
      return NextResponse.json(
        { error: storageError.message },
        { status: 500 }
      );
    }

    // 3. حذف من الجدول
    const { error: dbError } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", id);

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}