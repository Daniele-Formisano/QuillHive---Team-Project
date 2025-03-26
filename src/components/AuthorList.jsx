import { useGetUsersQuery } from "../services/apiService";
  import AuthorIconButton from "./AuthorIconButton";
  
  export default function AuthorList({ users }) {
    return (
      <div className="flex flex-nowrap overflow-y-auto gap-2">
        {users.map((user) => (
          <AuthorIconButton key={user.id} user={user} />
        ))}
      </div>
    );
  }