import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

function TestPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("title, author, content")
        .limit(10);

      if (error) setError(error.message);
      else setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Supabase 연동 테스트 (posts 테이블)
      </h1>
      {error && <div className="text-red-500">에러: {error}</div>}
      {!error && posts.length === 0 && <div>데이터가 없습니다.</div>}
      {!error && posts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.title}</td>
                  <td>{row.author}</td>
                  <td>{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TestPage;
