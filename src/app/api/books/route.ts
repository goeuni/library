import { NextResponse } from "next/server";

const ALADIN_API_KEY = process.env.ALADIN_API_KEY;
const ALADIN_API_URL = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

export async function GET() {
  try {
    const response = await fetch(
      `${ALADIN_API_URL}?ttbkey=${ALADIN_API_KEY}&QueryType=Bestseller&MaxResults=50&start=1&SearchTarget=Book&output=js&Version=20131101`
    );

    const data = await response.json();

    // 책 데이터를 가져오고 책 표지 이미지도 포함
    const books = data.item.map((item: any) => ({
      title: item.title,
      link: item.link,
      author: item.author,
      coverImage: item.cover, // 책 표지 이미지 URL
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error("베스트셀러 조회 중 오류 발생:", error);
    return NextResponse.json(
      { error: "베스트셀러를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
