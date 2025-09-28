import "../index.css";
import { FloatingGhost } from "../components/FloatingGhost";
import { useAllUsers } from "../hooks/useAllUsers";
import { totalScore, useUser } from "../hooks/useUser";

export const Leaderboard = () => {
  const { user, isLoading: isLoadingUser } = useUser();
  const { users, isLoading: isLoadingUsers } = useAllUsers();

  if (isLoadingUser || isLoadingUsers || !user || !users) {
    return (
      <div>
        <h1>Bouh !</h1>
        <FloatingGhost />
      </div>
    );
  }

  const usersWithTotalScore = users.map((u) => ({
    ...u,
    totalScore: totalScore(u),
  }));
  const sortedUsers = usersWithTotalScore.sort(
    (a, b) => b.totalScore - a.totalScore
  );

  return (
    <table
      style={{ textAlign: "left", border: "1px solid white" }}
      cellPadding={10}
      rules="all"
    >
      <thead>
        <tr>
          <th>Rang</th>
          <th>Nom</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((u, index) => (
          <tr key={u.id}>
            <td>{index + 1}</td>
            <td>{u.id === user.id ? <strong>⭐️ {u.name}</strong> : u.name}</td>
            <td>{u.totalScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
