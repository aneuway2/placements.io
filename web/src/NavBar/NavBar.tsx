import { Button, Input, makeStyles } from "@fluentui/react-components";
import { Link } from "wouter";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 10px 20px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export const NavBar = () => {
  const style = useStyles();
  // TODO: Implement search
  return (
    <div className={style.header}>
      <div>
        <Link to={"/"}>
          <img src="/Placements_logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={style.searchContainer}>
        <Input placeholder="Search..." />
        <Button onClick={() => alert("Not Implemented")}>Search</Button>
      </div>
    </div>
  );
};
