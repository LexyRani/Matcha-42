# Variables
DOCKER_COMPOSE = docker compose

# Couleurs pour les messages
GREEN	= \033[0;32m
RED		= \033[0;31m
YELLOW	= \033[0;33m
BLUE	= \033[0;34m
NC		= \033[0m # No Color

# Commandes principales
.PHONY: up down restart ps logs build clean backend frontend db help

# Démarrer tous les services en mode détaché
up:
	@echo "${GREEN}Démarrage de tous les services...${NC}"
	@$(DOCKER_COMPOSE) up -d
	@echo "${GREEN}Services démarrés!${NC}"
	@echo "${YELLOW}Pour voir les logs: make logs${NC}"

# Arrêter tous les services
down:
	@echo "${RED}Arrêt de tous les services...${NC}"
	@$(DOCKER_COMPOSE) down
	@echo "${RED}Services arrêtés!${NC}"

# Redémarrer tous les services
restart:
	@echo "${BLUE}Redémarrage de tous les services...${NC}"
	@$(DOCKER_COMPOSE) restart
	@echo "${GREEN}Services redémarrés!${NC}"

# Afficher l'état des services
ps:
	@echo "${BLUE}État des services:${NC}"
	@$(DOCKER_COMPOSE) ps

# Afficher les logs de tous les services
logs:
	@echo "${BLUE}Affichage des logs:${NC}"
	@$(DOCKER_COMPOSE) logs -f

# Construire ou reconstruire les services
build:
	@echo "${BLUE}Construction des services...${NC}"
	@$(DOCKER_COMPOSE) build
	@echo "${GREEN}Construction terminée!${NC}"

# Nettoyer les containers, réseaux et images non utilisés
clean:
	@echo "${RED}Nettoyage des ressources Docker...${NC}"
	@$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans
	@echo "${GREEN}Nettoyage terminé!${NC}"

# Démarrer uniquement le frontend
frontend:
	@echo "${BLUE}Démarrage du frontend...${NC}"
	@$(DOCKER_COMPOSE) up -d frontend
	@echo "${GREEN}Frontend démarré!${NC}"
	@echo "${YELLOW}Accessible sur: http://localhost:5173${NC}"
	@echo "${YELLOW}Pour voir les logs: docker compose logs -f frontend${NC}"

# Démarrer uniquement le backend
backend:
	@echo "${BLUE}Démarrage du backend...${NC}"
	@$(DOCKER_COMPOSE) up -d backend
	@echo "${GREEN}Backend démarré!${NC}"
	@echo "${YELLOW}Accessible sur: http://localhost:3001${NC}"
	@echo "${YELLOW}Pour voir les logs: docker compose logs -f backend${NC}"

# Démarrer uniquement la base de données
db:
	@echo "${BLUE}Démarrage de la base de données...${NC}"
	@$(DOCKER_COMPOSE) up -d postgres
	@echo "${GREEN}Base de données démarrée!${NC}"
	@echo "${YELLOW}Accessible sur: localhost:5432${NC}"
	@echo "${YELLOW}Pour voir les logs: docker compose logs -f postgres${NC}"

# Aide
help:
	@echo "${BLUE}Commandes disponibles:${NC}"
	@echo "  ${GREEN}make up${NC}	- Démarrer tous les services"
	@echo "  ${RED}make down${NC}	- Arrêter tous les services"
	@echo "  ${YELLOW}make restart${NC}	- Redémarrer tous les services"
	@echo "  ${BLUE}make ps${NC}	- Afficher l'état des services"
	@echo "  ${BLUE}make logs${NC}	- Afficher les logs de tous les services"
	@echo "  ${BLUE}make build${NC}	- Construire ou reconstruire les services"
	@echo "  ${RED}make clean${NC}	- Nettoyer les containers, réseaux et images non utilisés"
	@echo "  ${GREEN}make frontend${NC}- Démarrer uniquement le frontend"
	@echo "  ${GREEN}make backend${NC}	- Démarrer uniquement le backend"
	@echo "  ${GREEN}make db${NC}	- Démarrer uniquement la base de données"
