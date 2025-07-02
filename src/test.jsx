import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("posts").select("*").limit(1);

      if (error) setError(error.message);
      else setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase 연동 테스트</h1>
      {error && <div className="text-red-500">에러: {error}</div>}
      {data ? (
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        !error && <div>로딩 중...</div>
      )}
    </div>
  );
}

export default TestPage;
