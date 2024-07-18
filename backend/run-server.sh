#!/bin/bash
source .venv/bin/activate

pip install -r requirements.txt

nohup sudo .venv/bin/python3 manage.py runserver 0.0.0.0:8000 &
