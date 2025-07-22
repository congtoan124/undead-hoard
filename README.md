# UndeadHoard 🧟💎

Welcome to `UndeadHoard`, a decentralized application (DApp) built on the **Internet Computer**. This project allows you to raise your digital images from the dead, transforming them into unique, fully on-chain NFT treasures.

`UndeadHoard` is more than just an NFT minter; it's an immortal vault where you can securely mint, view, and manage your collection of undead digital artifacts in a truly decentralized manner.

-----

## ✨ Key Features

  * **Effortless Minting:** A clean and simple interface lets you upload your `.png` images and mint them as NFTs with just a few clicks.
  * **Fully On-Chain Storage:** All NFT data, including the image assets themselves, is stored directly within the canister on the Internet Computer, ensuring true decentralization, persistence, and security.
  * **Secure Authentication:** Integrates with **Internet Identity** for a secure, passwordless login experience.
  * **Personal Gallery:** View and manage all the NFTs you've minted in your personal collection gallery.
  * **Extensible Backend:** The Motoko backend is built with standard NFT functionalities, making it easy to extend with new features like a marketplace, auctions, or breeding mechanics.

-----

## 🛠️ Technology Stack

  * **Backend:** **Motoko**
  * **Frontend:** **React** & **TypeScript** (built with **Vite**)
  * **Platform:** **Internet Computer (ICP)**
  * **Authentication:** **Internet Identity**

-----

## 🚀 Running the Project Locally

To run and test the project on your local machine, follow these steps.

1.  **Start the local replica:** This command starts the local Internet Computer replica in the background.

    ```bash
    dfx start --background
    ```

2.  **Deploy the canisters:** This command deploys your canisters to the local replica and generates the necessary interface bindings.

    ```bash
    dfx deploy
    ```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

-----

## 🏗️ Canister Overview

The project is structured into two main canisters:

  * **`UndeadHoard_backend`**: The Motoko canister that handles all the core logic for the NFT collection. This includes minting, ownership records, metadata storage, and transfer functions.
  * **`UndeadHoard_frontend`**: The React/TypeScript canister that serves the user interface. It interacts with the backend canister to provide a seamless user experience for minting and viewing NFTs.