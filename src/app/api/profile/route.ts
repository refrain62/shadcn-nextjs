import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  console.log(formData);
  return NextResponse.json({ message: 'receive formData' });
}