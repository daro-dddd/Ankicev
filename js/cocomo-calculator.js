/**
 * Calculadora y Tutor Interactivo de COCOMO I y COCOMO II
 * Permite calcular Esfuerzo (Personas-Mes), Tiempo de Desarrollo (Meses) y Personal necesario.
 */

class CocomoCalculator {
  constructor() {
    // Coeficientes de COCOMO I Básico
    this.modes = {
      organic: { name: 'Orgánico (Pequeño, Flexible)', a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
      semidetached: { name: 'Semiacoplado (Mediano, Mixto)', a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
      embedded: { name: 'Empotrado / Embedded (Complejo, Rígido)', a: 3.6, b: 1.20, c: 2.5, d: 0.32 }
    };
  }

  calculate(kloc, modeKey) {
    const params = this.modes[modeKey] || this.modes.organic;
    
    // PM = a * (KLOC)^b  [Personas - Mes]
    const pm = params.a * Math.pow(kloc, params.b);
    
    // TDEV = c * (PM)^d  [Meses de desarrollo]
    const tdev = params.c * Math.pow(pm, params.d);
    
    // Staff = PM / TDEV   [Personas requeridas]
    const staff = pm / tdev;

    return {
      kloc,
      modeName: params.name,
      coefficients: params,
      pm: pm.toFixed(2),
      tdev: tdev.toFixed(2),
      staff: Math.ceil(staff),
      steps: [
        `1. Fórmula Esfuerzo: PM = ${params.a} * (${kloc})^${params.b} = ${pm.toFixed(2)} Personas-Mes`,
        `2. Fórmula Tiempo: TDEV = ${params.c} * (${pm.toFixed(2)})^${params.d} = ${tdev.toFixed(2)} Meses`,
        `3. Personal Estimado: Staff = ${pm.toFixed(2)} / ${tdev.toFixed(2)} = ${staff.toFixed(2)} -> ~${Math.ceil(staff)} desarrolladores`
      ]
    };
  }
}
