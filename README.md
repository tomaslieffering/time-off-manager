### Time Off Manager

#### Set up instructions

- `git clone https://github.com/tomaslieffering/time-off-manager.git`
- `cd time-off-manager/backend/`
- `cp .env.example .env`
- `cd ../`
- `docker compose up -d --build`
- `docker exec -it app_backend sh -c "composer install && php artisan key:generate && php artisan migrate:fresh --seed"`
- Add `timeoffmanager.local` and `api.timeoffmanager.local` to your `hosts` file
- Access the site at `http://timeoffmanager.local`
