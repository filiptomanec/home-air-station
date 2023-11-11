# Home Air Quality Tracker

Welcome to the Home Air Quality Tracker application repository. This React-based application is designed to help you monitor the air quality in your home with a focus on two primary rooms: the living room and the bedroom. It provides real-time data on temperature, humidity, and CO2 levels, as well as historical trends via graphical representations. Configuration settings for the application are secure and require user authentication.

![Alt text](./ReadmeImg.png?raw=true "Screen")

## Features

- **Real-time Air Quality Data**: See the latest readings for temperature, humidity, and CO2 levels in your living room and bedroom.
- **Historical Data Charts**: Track how your indoor environment changes over time with intuitive graphs.
- **Secure Settings**: Manage your application settings with confidence through a secure login process.
- **Multi-Room Monitoring**: Dedicated views for different rooms in your house.

## Live Application

The application is hosted on Firebase, providing a robust and scalable infrastructure. You can access the live application [here](https://filiphomestation.web.app).

## Backend Integration

The frontend interacts with a backend service built with NestJS, ensuring a structured, scalable, and maintainable server-side application.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before running the project, you need to have Node.js and npm installed on your machine.

- Install [Node.js](https://nodejs.org/en/)
- Install npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/filiptomanec/home-air-station.git
   ```
2. Navigate to the project directory
   ```sh
   cd home-air-station
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file and fill in the Firebase and other necessary configurations as provided in `.env.example`.

5. Start the development server
   ```sh
   npm start
   ```

## Usage

Once the application is running, you can monitor the air quality in real-time. Log in with your credentials to access the settings and adjust the application as needed.

[//]: # ()
[//]: # (## Roadmap)

[//]: # ()
[//]: # (- [ ] Add support for additional rooms.)

[//]: # (- [ ] Integrate with smart home devices.)

[//]: # (- [ ] Provide recommendations for improving air quality.)

[//]: # (- [ ] Implement notifications for poor air quality readings.)

[//]: # ()
[//]: # (## Contributing)

[//]: # ()
[//]: # (Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.)

[//]: # ()
[//]: # (1. Fork the Project)

[//]: # (2. Create your Feature Branch &#40;`git checkout -b feature/AmazingFeature`&#41;)

[//]: # (3. Commit your Changes &#40;`git commit -m 'Add some AmazingFeature'`&#41;)

[//]: # (4. Push to the Branch &#40;`git push origin feature/AmazingFeature`&#41;)

[//]: # (5. Open a Pull Request)

[//]: # ()
[//]: # (## License)

[//]: # ()
[//]: # (Distributed under the MIT License. See `LICENSE` for more information.)

## Contact

Filip Tomanec - tomanec.f@gmail.com

Project Link: [https://github.com/filiptomanec/home-air-station](https://github.com/filiptomanec/home-air-station)

## Acknowledgements

- [Firebase](https://firebase.google.com/)
- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
