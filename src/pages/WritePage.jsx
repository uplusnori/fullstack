import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "../libs/supabase";

// 1. Zod로 유효성 검사 스키마 정의
const postSchema = z.object({
  title: z.string().min(3, "제목은 3글자 이상이어야 합니다."),
  author: z.string().nonempty("작성자 이름을 입력해주세요."),
  content: z.string().min(10, "내용은 10글자 이상이어야 합니다."),
});

function WritePage() {
  const navigate = useNavigate();

  // 2. useForm 훅으로 폼 상태 및 함수 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  // Supabase insert로 변경
  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from("posts").insert([data]);

      if (error) {
        throw new Error(
          "서버에서 게시물 생성에 실패했습니다: " + error.message
        );
      }

      // 요청이 성공적으로 완료된 후, 목록 페이지로 이동
      navigate("/posts");
    } catch (error) {
      console.error("게시물 작성 중 에러 발생:", error);
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">새 게시물 작성</h1>
        <p className="text-gray-500">새로운 게시물을 작성해보세요.</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text font-medium">제목</span>
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="input input-bordered w-full"
              placeholder="게시물 제목을 입력하세요"
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="author" className="label">
              <span className="label-text font-medium">작성자</span>
            </label>
            <input
              id="author"
              type="text"
              {...register("author")}
              className="input input-bordered w-full"
              placeholder="작성자 이름을 입력하세요"
            />
            {errors.author && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.author.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="content" className="label">
              <span className="label-text font-medium">내용</span>
            </label>
            <textarea
              id="content"
              {...register("content")}
              className="textarea textarea-bordered w-full h-32"
              placeholder="게시물 내용을 입력하세요"
            />
            {errors.content && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.content.message}
                </span>
              </label>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "제출 중..." : "게시물 작성"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/posts")}
              className="btn btn-outline"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WritePage;
