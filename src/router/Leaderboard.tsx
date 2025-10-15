import "../index.css";
import { FloatingGhost } from "../components/FloatingGhost";
import { useAllUsers } from "../hooks/useAllUsers";
import { totalScore, useUser } from "../hooks/useUser";
import ghosts from "../assets/ghosts.json";
import enigmas from "../assets/enigmas.json";
import { POINTS_PER_GHOST } from "../hooks/useGhost";
import { POINTS_PER_ENIGMA } from "../hooks/useEnigma";

const PROGRESS_BAR_HEIGHT = 5;

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
  const total =
    ghosts.length * POINTS_PER_GHOST +
    enigmas.length * (POINTS_PER_GHOST + POINTS_PER_ENIGMA);

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
          <th>Points / {total}</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((u, index) => (
          <tr key={u.id}>
            <td>{index + 1}</td>
            <td>{u.id === user.id ? <strong>⭐️ {u.name}</strong> : u.name}</td>
            <td>
              {u.totalScore}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: PROGRESS_BAR_HEIGHT,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: PROGRESS_BAR_HEIGHT,
                    background: "gray",
                  }}
                />
                <div
                  style={{
                    width: `${(u.totalScore / total) * 100}%`,
                    height: PROGRESS_BAR_HEIGHT,
                    background: "green",
                    position: "absolute",
                    left: 0,
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
