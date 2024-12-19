"use client";

import { useEffect, useState } from "react";

interface Book {
  title: string;
  link: string;
  author: string;
  coverImage: string;
}

export default function RecommendedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      const data = await response.json();
      const randomBooks = data.sort(() => Math.random() - 0.5).slice(0, 5);
      setBooks(randomBooks);
      setLoading(false); // 데이터 로딩 완료
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("책 데이터를 가져오는데 실패했습니다.");
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    // 초기 데이터 가져오기
    fetchBooks();

    // 일정 시간 간격으로 데이터 변경
    const intervalId = setInterval(fetchBooks, 10000); // 10초마다 추천 도서 변경

    // 컴포넌트가 unmount될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-sky-700 text-center">
        추천 도서
      </h2>
      <div className="flex gap-6 overflow-x-auto">
        {books.map((book, index) => (
          <div key={index} className="flex-none w-48">
            {/* 책 표지 이미지 */}
            <img
              src={book.coverImage}
              alt={`${book.title} 표지`}
              className="w-full h-64 object-cover rounded-md shadow-md mb-2"
            />
            {/* 책 제목과 저자 */}
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center hover:text-sky-800"
            >
              {book.title} - {book.author}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
