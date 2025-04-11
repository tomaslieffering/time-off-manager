### Time Off Manager

#### Set up instructions

- `git clone https://github.com/tomaslieffering/time-off-manager.git`
- `cd time-off-manager/backend/`
- `cp .env.example .env`
- `cd ../`
- `cd frontend/`
- `cp .env.example .env`
- `cd ../`
- `docker compose up -d --build`
- `docker exec -it app_backend sh -c "composer install && php artisan key:generate && php artisan migrate:fresh --seed"`
- Add `timeoffmanager.local`, `api.timeoffmanager.local` and `mail.timeoffmanager.local` to your `hosts` file
- Access the site at `http://timeoffmanager.local`
- Use email `joeblogs@mail.com` and password `password` to view the application from a regular users view
- Use email `admin@mail.com` and password `password` to view the application from an admin users view

#### Assumptions

- I split the API routes into admin and normal user route for seperation of concerns. This strays away from the brief. The route `/admin/requests` returns all leave requests if the user is authorized as a admin. The route `/request` returns only the current users amount. This mean an admin user can view their own personal leave requests.
