export class Place {
  constructor(
    title,
    description,
    imageUriC,
    imageUriG,
    location,
    date,
    favorite,
    user,
    id
  ) {
    this.title = title;
    this.description = description;
    this.imageUriC = imageUriC;
    this.imageUriG = imageUriG;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.141241, lng: 127.121 }
    this.date = date;
    this.favorite = favorite;
    this.user = user;
    this.id = id;
  }
}
