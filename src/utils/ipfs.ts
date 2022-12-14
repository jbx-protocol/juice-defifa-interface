import { base58 } from "ethers/lib/utils";

/**
 * Return a HTTP URL to the IPFS gateway at the given [hostname] for the given [cid].
 */
const ipfsGatewayUrl = (cid: string | undefined = "", hostname: string) => {
  return `https://${hostname}/ipfs/${cid}`;
};

// get ipfs url when host is localhost or production
export const getIpfsUrl = (cid: string | undefined): string => {
  if (window.location.hostname === "localhost") {
    return ipfsGatewayUrl(cid, "ipfs.io");
  } else {
    return ipfsGatewayUrl(cid, "jbm.infura-ipfs.io");
  }
};

export function decodeEncodedIPFSUri(hex: string) {
  // Add default ipfs values for first 2 bytes:
  // - function:0x12=sha2, size:0x20=256 bits
  // - also cut off leading "0x"
  const hashHex = "1220" + hex.slice(2);
  const hashBytes = Buffer.from(hashHex, "hex");
  const hashStr = base58.encode(hashBytes);
  return hashStr;
}

// Determines if a string is a valid IPFS url.
export function isIpfsUrl(url: string) {
  return url.startsWith("ipfs://");
}

const IPFS_URL_REGEX = /ipfs:\/\/(.+)/;

export const cidFromIpfsUri = (ipfsUri: string) =>
  ipfsUri.match(IPFS_URL_REGEX)?.[1];
