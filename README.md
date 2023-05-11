<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/raymondtju/zez/blob/main/public/logo.svg">
    <img src="public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ZEZ</h3>

  <p align="center">
    An Open Source Free Custom URL Shortener
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/raymondtju/zez/issues">Report Bug</a>
    ·
    <a href="https://github.com/raymondtju/zez/issues">Request Feature</a>
  </p>
</div>



## About The Project

<div>
  <img src="/public/og.png" />
</div>




### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- NextJS 13.4 `/app` dir
- **Tailwind CSS** for styling
- **Upstash Redis** for storing public url and expiration
- **Mongo Atlas** for save URL for SignIn user
- **Next Auth** for User Authentication
- **Prisma** for ORM
- **Zustand** for state management
- **Radix-UI** for easier UI Components
- `qr-code-styling` package for QR-Code Generation
- Deployment with `Vercel`



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/raymondtju/zez.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env` file based on `.env.example`
   ```js
   DATABASE_URL=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_GUEST_TOKEN= 

   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=

   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```



<!-- ROADMAP -->
## Roadmap

- [x] Add QR Code
- [x] Configure Custom Metatags title and description
- [ ] Configure Custom Metatags Image
- [ ] Making UI more beautiful
- [ ] Adding some section into homepage
- [ ] Optimized Performance

See the [open issues](https://github.com/raymondtju/zez/issues) for a full list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@raymondtju_](https://twitter.com/raymondtju_) - raymondtju.dev@gmail.com

Project Link: [https://github.com/raymondtju/zez](https://github.com/raymondtju/zez)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/raymondtju/zez.svg?style=for-the-badge
[contributors-url]: https://github.com/raymondtju/zez/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/raymondtju/zez.svg?style=for-the-badge
[forks-url]: https://github.com/raymondtju/zez/network/members
[stars-shield]: https://img.shields.io/github/stars/raymondtju/zez.svg?style=for-the-badge
[stars-url]: https://github.com/raymondtju/zez/stargazers
[issues-shield]: https://img.shields.io/github/issues/raymondtju/zez.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/raymondtju/zez/issues
[license-shield]: https://img.shields.io/github/license/raymondtju/zez.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/raymondtju/zez/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/raymondtju
