### Time Off Manager

#### Set up instructions

- `git clone https://github.com/tomaslieffering/time-off-manager.git`
- `cd time-off-manager`
- `cp .env.example .env`
- `docker compose up -d`
- `docker exec -it app_backend sh -c "php artisan migrate:fresh --seed`
- Add `timeoffmanager.local` and `api.timeoffmanager.local` to your `hosts` file
- Access the site at `https://timeoffmanager.local`