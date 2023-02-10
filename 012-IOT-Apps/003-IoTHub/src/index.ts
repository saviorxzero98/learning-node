import * as IoTHub from 'azure-iothub';

const connectionString = 'HostName=yourhost.azure-devices.net;DeviceId=SimulateBeacon1;SharedAccessKey=yourkey';
const registry = IoTHub.Registry.fromConnectionString(connectionString);
