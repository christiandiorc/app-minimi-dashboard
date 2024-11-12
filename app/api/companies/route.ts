import { NextResponse } from 'next/server';
import DataSet from '@/data/MOCK_DATA.json';

export async function GET() {
  // Simulate a delay of {X} seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(DataSet));
    }, 1000); // Delay for {X}ms (X seconds)
  });
};

export async function DELETE(request: Request) {
  // Parse the request body to extract the array of IDs to delete
  const { ids }: { ids: number[] } = await request.json();

  if (!ids || ids.length === 0) {
    return NextResponse.json(
      { error: 'No IDs provided for deletion' },
      { status: 400 }
    );
  }

  // Filter out the companies whose IDs are in the provided array
  const updatedData = DataSet.filter((company) => !ids.includes(company.id));

  // return NextResponse.json({
  //   message: `Successfully deleted ${ids.length} record/s`,
  //   data: updatedData,
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json({
        message: `Successfully deleted ${ids.length} record/s`,
        data: updatedData,
      }));
    }, 1000); // Delay for {X}ms (X seconds)
  });
};