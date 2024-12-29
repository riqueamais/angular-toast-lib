# Angular Toast Library

Uma biblioteca simples e leve para exibir **toasts** no Angular.

## 🚀 Instalação

Você pode instalar a biblioteca via **npm**:

```markdown
npm install ngx-toast-lib
```

Certifique-se de que o **Tailwind CSS** está configurado no seu projeto, já que a biblioteca utiliza estilos do Tailwind.

---

## 🔧 Configuração

Utilize o cdn do Iconify na index.html do seu Projeto + Links(consulta):

https://icon-sets.iconify.design/
https://iconify.design/

```bash
<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
```

Se você ainda não configurou o **Tailwind CSS** no seu projeto Angular, siga estas etapas:

1. Instale as dependências do Tailwind:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. Configure o arquivo `tailwind.config.js`:

   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{html,ts}",
       "./node_modules/angular-toast-lib/**/*.{html,ts}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. Adicione o Tailwind ao seu arquivo `src/styles.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

---

## 🛠️ Como Usar

### 1. Importe o **BrowserAnimationsModule**

No arquivo `main.ts` ou no seu componente standalone:

```typescript
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { importProvidersFrom } from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom([BrowserModule, BrowserAnimationsModule])],
}).catch((err) => console.error(err));
```

### 2. Use o **ToastComponent** no Template

Adicione o componente de **toast** no seu template (geralmente no `app.component.html`):

```html
<app-toast></app-toast>
```

### 3. Injete e Use o **ToastService**

No componente onde você deseja exibir o toast:

```typescript
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToastComponent, ToastService } from "toast";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private toastService: ToastService) {}

  showToast(): void {
    this.toastService.add({
      title: "Sucesso",
      message: "Operação realizada com sucesso!",
      type: "success", // 'success' | 'error' | 'welcome' | 'custom'
      duration: 3000, // Duração em milissegundos
    });
  }
}
```

---

## ✨ Exemplos de Estilos

Os **toasts** vêm com estilos básicos e utilizam Tailwind CSS. Aqui estão os estilos suportados:

| Tipo      | Classe Tailwind  | Cor Padrão |
| --------- | ---------------- | ---------- |
| `success` | `.bg-green-500`  | Verde      |
| `error`   | `.bg-red-200`    | Vermelho   |
| `welcome` | `.bg-purple-300` | Roxo       |

Você pode personalizar esses estilos diretamente no arquivo de estilos da sua aplicação.

---

## 📝 Documentação do ToastService

### Método `add`

Adiciona um novo toast.

**Parâmetros:**

- `message` (string): Mensagem do toast.
- `type` (string): Tipo do toast (`success`, `error`, `welcome`, `custom`).
- `duration` (number): Duração do toast em milissegundos (padrão: `3500`).
- se for `custom`, teremos (`title`, `icon`, `iconColor`, `bgColor`).

**Exemplo:**

```typescript
this.toastService.add({
  title: "Toast Error",
  message: "Ocorreu um erro.",
  type: "error",
  duration: 5000,
});
```

---

**Exemplo de Custom:**

```typescript
this.toastService.add({
  title: "Custom",
  icon: "dashicons:welcome-learn-more",
  iconColor: "text-white",
  bgColor: "bg-gray-300",
  message: "teste de toast",
  duration: 2000,
  type: "custom",
});
```

---

## 🌟 Contribuições

Sinta-se à vontade para contribuir com melhorias! Basta abrir uma **issue** ou enviar um **pull request** no [repositório do GitHub](https://github.com/riqueamais/angular-toast-lib).

---

## 📄 Licença

Esta biblioteca está licenciada sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
