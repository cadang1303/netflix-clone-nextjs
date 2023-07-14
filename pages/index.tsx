import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
// import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  // const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
      </div>
    </div>
  );
}