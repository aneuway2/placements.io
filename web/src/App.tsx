import { Route, Switch } from "wouter";
import { NavBar } from "./NavBar/NavBar.tsx";
import { CampaignQuery } from "./Query/CampaignQuery.tsx";
import { LineItemQuery } from "./Query/LineItemQuery.tsx";
import { LineItemDetailQuery } from "./Query/LineItemDetailQuery.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeStaticStyles } from "@griffel/react";

const useStaticStyles = makeStaticStyles({
  body: {
    margin: "0px",
  },
});

const queryClient = new QueryClient();
const App = () => {
  useStaticStyles();
  return (
    <>
      <NavBar />
      <main>
        <Switch>
          <Route path="/">
            <QueryClientProvider client={queryClient}>
              <CampaignQuery />
            </QueryClientProvider>
          </Route>
          <Route path="/campaign/:campaign_id">
            <QueryClientProvider client={queryClient}>
              <LineItemQuery />
            </QueryClientProvider>
          </Route>
          <Route path="/campaign/:campaign_id/line-item/:line_item_id">
            <QueryClientProvider client={queryClient}>
              <LineItemDetailQuery />
            </QueryClientProvider>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
