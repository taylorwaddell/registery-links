export default function AddressToDirectionsLink(address: string): {
  google: string;
  apple: string;
} {
  // 100 lafayette st baton rouge la 70801
  // google: https://www.google.com/maps/dir//Shaw+Center+for+the+Arts,+100+Lafayette+St,+Baton+Rouge,+LA+70801/
  // apple: https://maps.apple.com/?daddr=Shaw%20Center%20for%20the%20Arts,%20100%20Lafayette%20St,%20Baton%20Rouge,%20LA%20%2070801,%20United%20States

  return {
    google: `https://www.google.com/maps/dir//${address.replace(/\s/g, "+")}`,
    apple: `https://maps.apple.com/?daddr=${address.replace(/\s/g, "%20")}`,
  };
}
