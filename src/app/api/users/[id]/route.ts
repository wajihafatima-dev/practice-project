import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const data = [
    { id: 1, name: 'abc' },
    { id: 2, name: 'def' },
    { id: 3, name: 'ghi' }
  ];
  const id = parseInt(params.id, 10);
  const item = data.find(d => d.id === id);
  if (item) {
    return NextResponse.json({
      isSuccessful: true,
      data: data
    });
  } else {
    return NextResponse.json({
      isSuccessful: false,
      message: "Item not found"
    }, { status: 404 });
  }
}
