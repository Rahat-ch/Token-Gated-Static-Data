import { ethers } from "ethers";
import { useState } from "react";
import './App.css';
import Content from "./components/Content";
import abi from "./utils/abi.json";

const contractAddress = "0x3B6a36B1Bc355AD68b11cFB69cEde2270C183Ffa";

function App() {
  const [address, setAddress] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { ethereum } = window;
  const handleWalletConnect = async () => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myAddress = await signer.getAddress();
      setAddress(myAddress);
      const nftContract = new ethers.Contract(contractAddress, abi, signer);
      const balance = await nftContract.balanceOf(myAddress)
      if(Number(balance.toString()) > 0) setIsAuthorized(true)
    } else {
      alert('you need to install metamask')
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      { address ? (
        <Content isAuthorized={isAuthorized} />
        ): (
          <button onClick={() => handleWalletConnect()}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;
