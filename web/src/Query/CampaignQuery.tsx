import { useQuery } from "@tanstack/react-query";
import { CampaignTable, Item } from "../DataTable/CampaignTable.tsx";
import { Metrics } from "../Metrics/Metrics.tsx";
import { CampaignTile } from "../Metrics/CampaignTile.tsx";
import { ObjectTitleBar } from "../ObjectTitleBar/ObjectTitleBar.tsx";
import { DocumentFolder20Filled } from "@fluentui/react-icons";

export const CampaignQuery = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/campaign");
      const response_data = await response.json();
      return response_data;
    },
    cacheTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (isFetching) return "Fetching...";

  return (
    <>
      <ObjectTitleBar Icon={<DocumentFolder20Filled />} label={"Campaigns"} />
      <Metrics data={data} TileComponent={CampaignTile} />
      <CampaignTable data={data.data} />
    </>
  );
};
