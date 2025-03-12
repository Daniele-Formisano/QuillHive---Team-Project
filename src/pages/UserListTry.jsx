import AuthorList from "../components/AuthorList";
import { useGetUsersQuery } from "../services/apiService";

export default function UserListTry() {
  const { data: users, isLoading, error } = useGetUsersQuery(); // in reatà dovra fetchare gli utenti che sono autori e non tutti gli user

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (users) {
    return (
      <div>
        <AuthorList users={users} />
      </div>
    );
  }
}
