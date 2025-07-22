import "./NFTForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UndeadHoard_backend } from "../../declarations/UndeadHoard_backend";
import { useAuth } from "./use-auth-client";
import { MintPayload } from "../../declarations/UndeadHoard_backend/UndeadHoard_backend.did";

function CreateNFT() {
  const [saving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | undefined>(undefined);
  const [image, setImage] = useState(Uint8Array.of());

  const navigate = useNavigate();

  const { principal } = useAuth();

  const handleMint = async () => {
    setSaving(true);
    try {
      const payload: MintPayload = {
        owner: [],
        contentType: "png",
        isPrivate: false,
        payload: image,
      };
      await UndeadHoard_backend.mintForMyself(payload);
      navigate("/");
    } catch (error: any) {
      const errorText: string = error.toString();
      setLastError(errorText);
    } finally {
      setSaving(false);
    }
  };

  const changeFile = async (file: File | undefined) => {
    let data = Uint8Array.of();
    if (file != null) {
      const stream = file.stream();
      const reader = stream.getReader();
      while (true) {
        const part = await reader.read();
        const chunk = part.value;
        if (chunk == null) {
          break;
        }
        data = concatUint8Arrays(data, chunk) as any;
      }
    }
    setImage(data);
  };

  // TODO: Faster way of concatenation
  const concatUint8Arrays = (
    left: Uint8Array,
    right: Uint8Array
  ): Uint8Array => {
    let temporary: number[] = [];
    for (let element of left) {
      temporary.push(element);
    }
    for (let element of right) {
      temporary.push(element);
    }
    return Uint8Array.from(temporary);
  };

  return (
    <>
      <div className="nft-form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="nft-form-row">
          <div className="nft-form-label">Picture (PNG only): </div>
          <div className="nft-form-input">
            <input
              type="file"
              accept=".png"
              onChange={(e) => changeFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="nft-form-footer">
          <button
            className="nft-form-button"
            onClick={handleMint}
            disabled={saving}
          >
            Mint NFT
          </button>
        </div>
        {lastError != null && <p className="error-message">{lastError}</p>}
      </div>
    </>
  );
}

export default CreateNFT;