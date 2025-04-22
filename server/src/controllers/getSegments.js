import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const getSegments = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - getSegments - Request received...`);

    const { context } = req.sdk;
    const accessToken = context?.org?.accessToken;
    const domainUrl = context?.org?.domainUrl;

    const org = await req.sdk.addons.herokuIntegration.getConnection("dc-epai-org");

    console.log("org", org);

    console.log(`${getCurrentTimestamp()} 👀 - getSegments - Fetching segments...`);

    const response = await fetch(`${domainUrl}/services/data/v63.0/ssot/segments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const formattedSegments = data.segments?.map((segment) => ({
      name: segment.displayName,
      apiName: segment.apiName,
      dataSpace: segment.dataSpace,
      segmentDefinitionId: segment.marketSegmentDefinitionId,
      segmentId: segment.marketSegmentId,
      segmentStatus: segment.segmentStatus,
      publishStatus: segment.publishStatus ?? "NOT PUBLISHED",
      segmentType: segment.segmentType,
    }));

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to get segment information: ${response.status} - ${response.statusText}`
      );
    }

    console.log(`${getCurrentTimestamp()} ✅ - getSegments - Segment information successfully provided!`);

    res.status(200).send({
      message: "Data Cloud Segments",
      segments: formattedSegments,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getSegments - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default getSegments;
