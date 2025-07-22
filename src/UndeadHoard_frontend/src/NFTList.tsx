import "./NFTList.scss";
import { useEffect, useState } from "react";
import { UndeadHoard_backend } from "../../declarations/UndeadHoard_backend";
import { useAuth } from "./use-auth-client";
import { TokenInfoExt } from "../../declarations/UndeadHoard_backend/UndeadHoard_backend.did";

function NFTList() {
  const [NFTs, setNFTs] = useState<TokenInfoExt[]>([]);

  const { principal } = useAuth();

  const fetchNFT = async () => {
    if (!principal) {
      return;
    }
    const result = await UndeadHoard_backend.getMyTokens();
    setNFTs(result);
  };

  useEffect(() => {
    fetchNFT();
  }, [principal]);

  if (!NFTs || NFTs.length === 0) {
    return <p>No NFTs found.</p>;
  }

  function getImageSource(imageData: Uint8Array | number[]) {
    if (imageData != null) {
      const array = Uint8Array.from(imageData);
      const blob = new Blob([array.buffer], { type: "image/png" });
      return URL.createObjectURL(blob);
    } else {
      return "";
    }
  }

  return (
    <div className="gallery-grid">
      {NFTs.map((nft) => (
        <div key={nft.index.toString()} className="nft-card">
          {nft.metadata[0]?.location &&
            "InCanister" in nft.metadata[0]?.location && (
              <img
                src={getImageSource(nft.metadata[0]?.location["InCanister"])}
                alt={`NFT ${nft.index}`}
              />
            )}
          <p># {nft.index.toString()}</p>
        </div>
      ))}
    </div>
  );
}

export default NFTList;