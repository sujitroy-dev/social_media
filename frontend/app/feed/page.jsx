import MainLayout from "@/layouts/main";
import CreatePost from "@/components/Feed/createPost";
import FeedSection from "@/components/Feed/FeedSection";

export default async function Home() {
  return (
    <>
      <MainLayout>
        <CreatePost />
        <FeedSection feedType="recents" />
      </MainLayout>
    </>
  );
}
