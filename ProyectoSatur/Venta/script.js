
// SDK de Mercado Pago
import { MercadoPagoConfig } from 'MercadoPago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-8575782531228430-082802-1efa37bbfac92782a51894b22b0b5a42-406333239' });

// Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
      },
    ],
  };

let error = false;
ids.forEach((id)=>{
  const product = productsCopy.find((p) => p.id === id);
  if (product.stock > 0){
    product.stock--;
    preference.items.push(
      {
      title: product.name,
      unit_price: product.price,
      quantity: 1,
    });
  } else {
    error = true;
  }
});

mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  const idDePreferencia = response.body.id;
  })
  .catch(function (error) {
    console.log(error);
  });
  