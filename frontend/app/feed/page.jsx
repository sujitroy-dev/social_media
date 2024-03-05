import AuthForm from "@/components/modal/auth";
import MainLayout from "@/layouts/main";
import CreatePost from "@/components/Feed/createPost";
import FeedSection from "@/components/Feed/FeedSection";

export default async function Home() {
  return (
    <>
      <AuthForm />
      <MainLayout>
        <CreatePost />
        <FeedSection feedType="recents" />
      </MainLayout>
    </>
  );
}
