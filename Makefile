DEP := index.pug render.js package.json
OBJ := node_modules package-lock.json
TGT := index.html

.DEFAULT: all
.PHONY: all clean mostlyclean rebuild update

all: $(TGT)

clean: mostlyclean
	rm -f -r $(OBJ)

mostlyclean:
	rm -f -r $(TGT)

rebuild: mostlyclean
	make $(TGT)

update: $(OBJ)
	npm update

$(OBJ): $(DEP)
	npm install

index.html: $(OBJ)
	node render.js > $@